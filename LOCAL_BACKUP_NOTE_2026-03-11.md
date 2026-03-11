# Local backup note — 2026-03-11

Before overnight overhaul work, the existing repo state was left intact and the pre-existing backup folder was not touched.

Practical recovery point:
- Git repo: `projects/autobookr-landing`
- Check current state with: `git status` and `git diff`
- Restore a file from HEAD if needed with: `git checkout -- <file>`
- Review commit history with: `git log --oneline --decorate -n 10`

This note was created as the requested local backup marker before making further changes.
