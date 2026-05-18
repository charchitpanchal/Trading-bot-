# Trading Bot

A simple Python CLI trading bot built for Binance Futures Testnet (USDT-M).

This project allows users to place MARKET and LIMIT orders using command-line arguments. It includes input validation, logging, structured project organization, and exception handling.

---

# Features

- Place MARKET orders
- Place LIMIT orders
- BUY and SELL support
- Binance Futures Testnet integration
- Command Line Interface (CLI)
- Input validation
- Error handling
- Logging of API requests, responses, and errors

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
│   └── cli.py
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

Go into the project folder:

```bash
cd Trading-bot-
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

## Windows

```bash
.\venv\Scripts\Activate.ps1
```

Install dependencies:

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

# Binance Futures Testnet

Testnet URL:

```text
https://testnet.binancefuture.com
```

Generate API Keys from Binance Futures Testnet API Management.

---

# Run MARKET Order

```bash
python -m bot.cli --symbol BTCUSDT --side BUY --type MARKET --quantity 0.001
```

Example Output:

```text
ORDER SUCCESS
Order ID: 123456
Status: NEW
Executed Quantity: 0.0000
```

---

# Run LIMIT Order

```bash
python -m bot.cli --symbol BTCUSDT --side SELL --type LIMIT --quantity 0.001 --price 75000
```

---

# Logging

Logs are stored inside:

```text
logs/trading_bot.log
```

The log file includes:
- API request logs
- API response logs
- Error logs

---

# Validation

The application validates:
- BUY / SELL side
- MARKET / LIMIT order type
- Positive quantity
- Price requirement for LIMIT orders

---

# Error Handling

The project handles:
- Invalid user input
- API errors
- Network-related exceptions

---

# Assumptions

- Binance Futures Testnet is used instead of real trading environment
- Python 3.x is installed
- User has valid Binance Testnet API keys
- Internet connection is available

---

# Technologies Used

- Python 3
- python-binance
- python-dotenv

---

# Author

Charchit Panchal