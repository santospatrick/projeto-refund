const amount = document.getElementById('amount');

amount.addEventListener('input', function() {
    const value = this.value.replace(/\D/g, '');
    this.value = new Intl.NumberFormat().format(value);
})