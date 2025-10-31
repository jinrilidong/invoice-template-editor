/**
 * Placeholder path utilities.
 * This file exists to satisfy references from CSS build tools.
 * Replace with real implementations if needed.
 */

export type PathJoiner = (...segments: string[]) => string

export const joinPath: PathJoiner = (...segments) =>
  segments
    .filter(Boolean)
    .join('/')
    .replace(/\/+/, '/')

export const normalizePath = (input: string): string => input.replace(/\\/g, '/').replace(/\/+/, '/')

export default {
  joinPath,
  normalizePath,
}


