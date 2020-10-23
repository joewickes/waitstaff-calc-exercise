import store from './store.js';

function render() {
  $('main').html(`
    <div class="all-boxes">
      <div class="left-side">
        <div class="meal-details-container">
          <div class="box-header">
            <h2>Meal Details</h2>
          </div>
          <div class="details">
            <form id="meal-details-form">
              <div>
                <label for="base-meal-price">Base Meal Price $</label>
                <input type="number" name="base-meal-price" id="base-meal-price">
              </div>
              <div>
                <label for="tax-rate">Tax Rate %</label>
                <input type="number" name="tax-rate" id="tax-rate">
              </div>
              <div>
                <label for="tip-percentage">Tip Percentage %</label>
                <input type="number" name="tip-percentage" id="tip-percentage">
              </div>
            </form>
            <div class="buttons">
              <button type="submit" form="meal-details-form" id="form-button">Submit</button>
              <button id="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="right-side">
        <div class="customer-charges-container">
          <div>
            <h2>Customer Charges</h2>
          </div>
          <div class="charges">
            <div class="whole-charges">
              <div class="left-charges">
                <p>Subtotal</p>
                <p>Tip</p>
              </div>
              <div class="right-charges">
                <p>${store.subTotal}</p>
                <p>${store.tip}</p>
              </div>
            </div>
            <div class="whole-total">
              <div class="left-total">
                <p>Total</p>
              </div>
              <div class="right-total">
                <p>${store.total}</p>
              </div>
            </div>
          </div>
        </div>
    
        <div class="my-earnings-info-container">
          <div>
            <h2>My Earnings Info</h2>
          </div>
          <div class="earnings">
            <div class="left-earnings">
              <p>Tip Total</p>
              <p>Meal Count</p>
              <p>Average Tip Per Meal</p>
            </div>
            <div class="right-earnings">
              <p>${store.tipTotal}</p>
              <p>${store.mealCount}</p>
              <p>${store.avgTPM}</p>
            </div>
          </div>
        </div>
      </div>
      <button id="reset-button">Reset</button>
    </div>
  `);
}

function handleSubmit() {
  $('main').on('submit', '#meal-details-form', function(e) {
    e.preventDefault();
    const bmpVal = $('#base-meal-price').val();
    const trVal = $('#tax-rate').val();
    const tpVal = $('#tip-percentage').val();

    if (validateNums(bmpVal, trVal, tpVal)) {
      const bmp = parseFloat(bmpVal);
      const tr = parseFloat(trVal) / 100;
      const tp = parseFloat(tpVal) / 100;
      store.details.push(store.createItem(bmp, tr, tp));
      store.getSubtotal();
      store.getTip();
      store.getTotal();
      store.mealCount++;
      store.getAvgTPM();
      render();
    } else {
      throw new Error('Please fill out all areas');
    }
  });
}

function handleCancel() {
  $('main').on('click', '#cancel-button', function() {
    $('#base-meal-price').val(null);
    $('#tax-rate').val(null);
    $('#tip-percentage').val(null);
    render();
  });
}

function handleReset() {
  $('main').on('click', '#reset-button', function() {
    store.subTotal = 0;
    store. tip = 0;
    store.total = 0;
    store.tipTotal = 0;
    store. mealCount = 0;
    store.avgTPM = 0;
    render();
  });
}

function validateNums(bmp, tr, tp) {
  const arr = [bmp, tr, tp];

  for (let i = 0; i < arr.length; i++) {
    const currentParse = parseFloat(arr[i]);
    if (isNaN(currentParse)) {
      return false;
    }
  }
  return true;
}



function main() {
  render();
  handleSubmit();
  handleReset();
  handleCancel();
}

$(main);