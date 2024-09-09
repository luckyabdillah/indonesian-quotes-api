<div align="center">

# Indonesian Quotes API

<!-- [![MIT License](https://img.shields.io/github/license/luckyabdillah/indonesian-quotes-api)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![MIT License](https://img.shields.io/badge/author-luckyabdillah-purple)](https://github.com/luckyabdillah/) -->

</div>

Hola!👋 Indonesian Quotes API is a text api that you can use for free! I took a lot of Indonesian quotes from the internet and put them together in this API so that anyone can access them easily. If you'd like to contribute to this small project, that would be great!

## Tech stacks

- Node.js & Express
- TailwindCSS

# Endpoint 🔗

**BASE URL: [https://indonesian-quotes-api.vercel.app](https://indonesian-quotes-api.vercel.app)**

| Endpoint             | Description                                                                            | Parameter  | Method |
| -------------------- | -------------------------------------------------------------------------------------- | ---------- | ------ |
| `/`                  | **Indonesian Quotes API** webpage                                                      | NO         | GET    |
| `/api/quotes`        | Get all quotes                                                                         | `category` | GET    |
| `/api/categories`    | Displays all possible categories                                                       | NO         | GET    |
| `/api/quotes/random` | Get random quotes for every call.                                                      | `category` | GET    |
| `/api/quotes/{id}`   | Get consistent quote for every call with the same ID                                   | NO         | GET    |
| `/api/quotes/`       | Submit own quote (see the docs [here](https://indonesian-quotes-api.vercel.app/about)) | NO         | POST   |

# Example 💻

### Get random quote

**Request**

```javascript
const response = await fetch(
  "https://indonesian-quotes-api.vercel.app/api/quotes/random"
);

if (!response.ok) {
  // Do something if the request fails
}
const quotes = await response.json();

console.log(quotes);
```

**Response**

```json
{
  "status": 200,
  "endpoint": "/api/quotes/random",
  "method": "GET",
  "data": {
    "id": 21,
    "quote": "Daun yang jatuh tak pernah membenci angin. Dia membiarkan dirinya jatuh begitu saja. Tak melawan, Mengikhlaskan semua.",
    "source": "Tere Liye",
    "description": "Penulis dari Indonesia",
    "category": "life"
  }
}
```

# Contributing

This project is open-source. Feel free to crunch a bug, add a feature, or fix a small typo.

# Running in Local

1. Cloning this repo:

```bash
git clone https://github.com/luckyabdillah/indonesian-quotes-api.git
```

2. Install npm dependencies:

```bash
npm install
```

3. Run in local server

```bash
node index.js
```

\*make sure you have Node.js installed on your machine

# License

Indonesian Quotes API is licensed under [GNU GENERAL PUBLIC LICENSE v3 license](./LICENSE)

```
Indonesian Quotes API is a free-to-use text API of Indonesian quotes.
Copyright (C) 2024-present  Indonesian Quotes Contributors

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
