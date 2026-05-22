# Trading Bot

This is a simple Python CLI trading bot built for Binance Futures Testnet (USDT-M).

The project allows users to place MARKET and LIMIT orders directly from the terminal using command-line arguments. The application includes input validation, logging, exception handling, and enhanced CLI output formatting for a better user experience.

---

# Features

- Place MARKET orders
- Place LIMIT orders
- Supports both BUY and SELL orders
- Binance Futures Testnet integration
- Command Line Interface (CLI)
- Web UI for placing orders
- Enhanced CLI output formatting
- Input validation
- Logging of API requests and responses
- Error handling

---

# Project Structure

```text
trading_bot/
│
├── bot/
│   ├── __init__.py
│   ├── client.py
│   ├── orders.py
│   ├── validators.py
│   ├── logging_config.py
│   ├── cli.py
│   └── api.py
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── logs/
│   └── trading_bot.log
│
├── .env
├── .gitignore
├── README.md
├── requirements.txt
└── venv/
```

---

# Requirements

- Python 3.x
- Binance Futures Testnet account
- Binance API Key and Secret Key

---

# Installation

Clone the repository:

```bash
git clone https://github.com/charchitpanchal/Trading-bot-.git
```

Move into the project folder:

```bash
cd Trading-bot-
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

## Windows

```bash
.\venv\Scripts\Activate.ps1
```

Install the required packages:

```bash
pip install -r requirements.txt
```

---

# Setup

Create a `.env` file in the root directory and add your Binance Testnet API credentials:

```env
BINANCE_API_KEY=your_api_key
BINANCE_SECRET_KEY=your_secret_key
```

---

# Open in Visual Studio Code

1. Install [Visual Studio Code](https://code.visualstudio.com/) and the **Python** extension.
2. Open the project:
   - **File → Open Folder** → select the `trading_bot` folder, or
   - **File → Open Workspace from File** → open `trading_bot.code-workspace`
3. When prompted, select the interpreter: `venv\Scripts\python.exe`
4. Run the web UI:
   - **Run and Debug** (Ctrl+Shift+D) → choose **Web UI: FastAPI** → press F5, or
   - **Terminal → Run Task** → **Run Web UI**
5. Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

Launch configs for sample CLI orders are also in `.vscode/launch.json`.

---

# Running the Project

## Web UI (recommended)

Start the API server (serves the frontend at the same URL):

```bash
uvicorn bot.api:app --reload
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser. Use the form to place MARKET or LIMIT orders. API keys stay on the server in `.env` and are never sent to the browser.

---

## CLI

### MARKET Order

```bash
python -m bot.cli --symbol BTCUSDT --side BUY --type MARKET --quantity 0.001
```

Example Output:

```text
==============================
ORDER SUCCESS
==============================
Symbol            : BTCUSDT
Side              : BUY
Order Type        : MARKET
Order ID          : 123456
Status            : NEW
Executed Quantity : 0.0000
==============================
```

---

## LIMIT Order

```bash
python -m bot.cli --symbol BTCUSDT --side SELL --type LIMIT --quantity 0.001 --price 75000
```

---

# Logging

All API requests, responses, and errors are stored inside:

```text
logs/trading_bot.log
```

The log file contains:
- order requests
- API responses
- validation errors
- exception logs

---

# Validation

The application validates:
- BUY / SELL side
- MARKET / LIMIT order type
- quantity greater than 0
- price requirement for LIMIT orders

---

# Error Handling

The project handles:
- invalid user input
- Binance API errors
- network-related exceptions

Example Error Output:

```text
==============================
ORDER FAILED
==============================
Reason: Invalid order parameters
==============================
```

---

# Assumptions

- Binance Futures Testnet is used instead of real trading
- Python 3.x is installed on the system
- Valid Binance Testnet API keys are available
- Internet connection is active

---

# Technologies Used

- Python 3
- python-binance
- python-dotenv
- FastAPI
- Uvicorn

---

# Bonus Feature

Implemented enhanced CLI output formatting for improved user experience and readability.

---
# Git Ignore

The `.gitignore` file is used to prevent sensitive and unnecessary files from being uploaded to GitHub.

Ignored files/folders:
- `venv/` → virtual environment
- `.env` → API keys and secrets
- `__pycache__/` → Python cache files

# Author

Charchit Panchal