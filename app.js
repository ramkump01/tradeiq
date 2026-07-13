const actionButtons = document.querySelectorAll('.toggle-btn');
const instrumentSelect = document.getElementById('instrument');
const qtyInput = document.getElementById('qty');
const orderInstrument = document.getElementById('orderInstrument');
const orderAction = document.getElementById('orderAction');
const orderCost = document.getElementById('orderCost');
const placeOrderButton = document.getElementById('placeOrder');
const statusMessage = document.getElementById('statusMessage');

const instrumentPrices = {
  'NVDA': 125,
  'BTC/USD': 30000,
  'EUR/USD': 1.09,
  'SPY': 512,
};

function updateCost() {
  const qty = Number(qtyInput.value) || 1;
  const selected = instrumentSelect.value;
  const price = instrumentPrices[selected] || 100;
  const cost = (price * qty).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  orderInstrument.textContent = selected;
  orderCost.textContent = cost;
}

actionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    actionButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    orderAction.textContent = button.dataset.action === 'sell' ? 'Sell' : 'Buy';
  });
});

instrumentSelect.addEventListener('change', updateCost);
qtyInput.addEventListener('input', updateCost);

placeOrderButton.addEventListener('click', () => {
  const action = orderAction.textContent;
  const instrument = orderInstrument.textContent;
  const qty = qtyInput.value;
  statusMessage.textContent = `${action} order prepared for ${qty} ${instrument} • demo only`;
});

updateCost();
