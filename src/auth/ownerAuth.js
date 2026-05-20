// ============================================================
// Owner authentication (client-side only)
// ============================================================
// SECURITY NOTE
// This is a static GitHub Pages site with no backend, so the password
// hash ships in the JS bundle. That means a determined attacker can
// download the bundle and brute-force the SHA-256 — this is a *lock
// on a glass door*, not real security. It stops casual visitors, not
// someone who's actually trying.
//
// HOW TO CHANGE THE PASSWORD
// Option 1 (per-browser, no rebuild): log in, go to dashboard
// Settings, use "Change owner password". Stored in localStorage,
// only affects the browser you do it in.
//
// Option 2 (default for everyone, rebuild required): regenerate the
// hash and replace DEFAULT_OWNER_PASSWORD_HASH below.
//   PowerShell:
//     $bytes=[Text.Encoding]::UTF8.GetBytes("YourNewPassword")
//     [BitConverter]::ToString(
//       [Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
//     ).Replace("-","").ToLower()
//   Node:
//     node -e "console.log(require('crypto').createHash('sha256').update('YourNewPassword').digest('hex'))"
// ============================================================

// SHA-256 of "axional2026" — the default. Change in the dashboard
// (per-browser) or here (for all browsers, requires rebuild).
const DEFAULT_OWNER_PASSWORD_HASH =
  'd687a53422946918ebcb5262fcae6b2556d1beba9aaebebc3ddf512bca050ec8'

const SESSION_KEY = 'ggw.owner.session'
const HASH_OVERRIDE_KEY = 'ggw.owner.hashOverride'

// Session expires after 7 days
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

export async function sha256Hex(input) {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function getActiveHash() {
  return localStorage.getItem(HASH_OVERRIDE_KEY) || DEFAULT_OWNER_PASSWORD_HASH
}

export async function verifyPassword(password) {
  if (!password) return false
  const candidate = await sha256Hex(password)
  return candidate === getActiveHash()
}

export async function changePassword(currentPassword, newPassword) {
  const ok = await verifyPassword(currentPassword)
  if (!ok) return { ok: false, error: 'Current password is incorrect.' }
  if (!newPassword || newPassword.length < 6) {
    return { ok: false, error: 'New password must be at least 6 characters.' }
  }
  const newHash = await sha256Hex(newPassword)
  localStorage.setItem(HASH_OVERRIDE_KEY, newHash)
  return { ok: true }
}

export function resetPasswordToDefault() {
  localStorage.removeItem(HASH_OVERRIDE_KEY)
}

export function isAuthenticated() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return false
    const session = JSON.parse(raw)
    if (!session || !session.exp) return false
    if (Date.now() > session.exp) {
      localStorage.removeItem(SESSION_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

export function setAuthenticated() {
  const session = { exp: Date.now() + SESSION_TTL_MS }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}
