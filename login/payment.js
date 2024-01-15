document.addEventListener('DOMContentLoaded', function () {
    function getTotalFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const totalAmount = urlParams.get('total') || 0;

        document.getElementById('total-price').textContent = `Total Price = ${totalAmount} GEL`;
    }

    getTotalFromURL();
});