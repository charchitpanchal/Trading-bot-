const form = document.getElementById("orderForm");
const orderTypeSelect = document.getElementById("orderType");
const priceField = document.getElementById("priceField");
const priceInput = document.getElementById("price");
const submitBtn = document.getElementById("submitBtn");
const btnLabel = submitBtn.querySelector(".btn-label");
const btnSpinner = submitBtn.querySelector(".btn-spinner");
const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultDetails = document.getElementById("resultDetails");
const dismissResult = document.getElementById("dismissResult");
const healthStatus = document.getElementById("healthStatus");

function togglePriceField() {
  const isLimit = orderTypeSelect.value === "LIMIT";
  priceField.classList.toggle("hidden", !isLimit);
  priceInput.required = isLimit;
  if (!isLimit) {
    priceInput.value = "";
  }
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  btnSpinner.hidden = !loading;
  btnLabel.textContent = loading ? "Placing order…" : "Place order";
}

function showResult(success, rows, message) {
  resultCard.hidden = false;
  resultCard.className = `card result-card ${success ? "success" : "error"}`;
  resultTitle.textContent = success ? "Order placed" : "Order failed";

  resultDetails.innerHTML = "";

  if (message && !success) {
    const div = document.createElement("div");
    div.innerHTML = `<dt>Reason</dt><dd>${escapeHtml(message)}</dd>`;
    resultDetails.appendChild(div);
  }

  for (const [label, value] of rows) {
    const div = document.createElement("div");
    div.innerHTML = `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(String(value ?? "—"))}</dd>`;
    resultDetails.appendChild(div);
  }

  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function escapeHtml(text) {
  const el = document.createElement("span");
  el.textContent = text;
  return el.innerHTML;
}

async function checkHealth() {
  const dot = healthStatus;
  try {
    const res = await fetch("/api/health");
    if (!res.ok) throw new Error("unhealthy");
    dot.classList.add("online");
    dot.classList.remove("offline");
    dot.querySelector(".status-text").textContent = "API online";
  } catch {
    dot.classList.add("offline");
    dot.classList.remove("online");
    dot.querySelector(".status-text").textContent = "API offline";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setLoading(true);

  const payload = {
    symbol: document.getElementById("symbol").value.trim().toUpperCase(),
    side: document.getElementById("side").value,
    type: document.getElementById("orderType").value,
    quantity: parseFloat(document.getElementById("quantity").value),
  };

  const priceVal = priceInput.value.trim();
  if (payload.type === "LIMIT" && priceVal) {
    payload.price = parseFloat(priceVal);
  }

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const detail = data.detail;
      const message =
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
            ? detail.map((d) => d.msg).join("; ")
            : "Request failed";
      showResult(false, [], message);
      return;
    }

    showResult(true, [
      ["Symbol", data.symbol],
      ["Side", data.side],
      ["Order type", data.order_type],
      ["Order ID", data.order_id],
      ["Status", data.status],
      ["Executed qty", data.executed_qty],
    ]);
  } catch (err) {
    showResult(false, [], err.message || "Network error");
  } finally {
    setLoading(false);
  }
});

dismissResult.addEventListener("click", () => {
  resultCard.hidden = true;
});

orderTypeSelect.addEventListener("change", togglePriceField);

togglePriceField();
checkHealth();
