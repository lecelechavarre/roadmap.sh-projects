# GitHub Random Repository

Pick a language from a dropdown and fetch a random repository using the GitHub Search API. Shows repo name, description, stars, forks, and open issues. Handles loading, empty, and error states. A Refresh button appears after success.

## Features

- Language dropdown (customizable in `languages.js`)
- Random repository sampling (within GitHub Search's 1,000 accessible results)
- Clean UI states: loading / empty / error / success
- Optional GitHub token to raise rate limits
- Abort in-flight requests on new actions
- Accessible and responsive

## Run locally

Any static server works:

### Option A: Python 3
```bash
python -m http.server 5173
# then open http://localhost:5173