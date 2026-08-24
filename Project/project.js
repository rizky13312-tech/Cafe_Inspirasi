let total = 0;
let pesanan = [];

// =========================
// TAMBAH PESANAN
// =========================
function tambahPesanan(button, nama, harga) {

    const qty = parseInt(
        button.parentElement.querySelector(".qty").value
    );

    if (isNaN(qty) || qty < 1) {
        alert("Jumlah pesanan tidak valid.");
        return;
    }

    const itemLama = pesanan.find(
        item => item.nama === nama
    );

    if (itemLama) {
        itemLama.qty += qty;
    } else {
        pesanan.push({
            nama: nama,
            harga: harga,
            qty: qty
        });
    }

    renderKeranjang();
}

// =========================
// TAMPILKAN KERANJANG
// =========================
function renderKeranjang() {

    const keranjang =
        document.getElementById("keranjang");

    keranjang.innerHTML = "";

    total = 0;

    pesanan.forEach((item, index) => {

        const subtotal =
            item.harga * item.qty;

        total += subtotal;

        const li =
            document.createElement("li");

        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div>
                <strong>${item.nama}</strong>
                <br>
                ${item.qty} x Rp ${item.harga.toLocaleString("id-ID")}
            </div>

            <div>
                Rp ${subtotal.toLocaleString("id-ID")}
                <button
                    class="btn btn-danger btn-sm ms-2"
                    onclick="hapusPesanan(${index})">
                    Hapus
                </button>
            </div>
        `;

        keranjang.appendChild(li);
    });

    updateTotal();
}

// =========================
// HAPUS PESANAN
// =========================
function hapusPesanan(index) {

    pesanan.splice(index, 1);

    renderKeranjang();
}

// =========================
// UPDATE TOTAL
// =========================
function updateTotal() {

    document.getElementById("total").innerText =
        total.toLocaleString("id-ID");
}

// =========================
// METODE PEMBAYARAN
// =========================
function ubahPembayaran() {

    const metodeDipilih =
        document.querySelector(
            'input[name="bayar"]:checked'
        );

    const semuaBox = [
        "cashBox",
        "qrisBox",
        "transferBox"
    ];

    semuaBox.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.classList.add("d-none");
        }
    });

    if (!metodeDipilih) return;

    const metode =
        metodeDipilih.value;

    if (metode === "Cash") {
        document
            .getElementById("cashBox")
            ?.classList.remove("d-none");
    }

    if (metode === "QRIS") {
        document
            .getElementById("qrisBox")
            ?.classList.remove("d-none");
    }

    if (metode === "Transfer Bank") {
        document
            .getElementById("transferBox")
            ?.classList.remove("d-none");
    }
}

// =========================
// CHECKOUT
// =========================
function checkout() {

    const namaPelanggan =
        document
            .getElementById("namaPelanggan")
            .value
            .trim();

    if (namaPelanggan === "") {
        alert("Silakan isi nama pelanggan.");
        return;
    }

    if (pesanan.length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    const metodeDipilih =
        document.querySelector(
            'input[name="bayar"]:checked'
        );

    if (!metodeDipilih) {
        alert("Pilih metode pembayaran.");
        return;
    }

    const metode =
        metodeDipilih.value;

    const confirmPaid =
        document.getElementById("confirmPaid")
            ?.checked;

    if (
        metode !== "Cash" &&
        !confirmPaid
    ) {
        alert(
            "Centang konfirmasi pembayaran terlebih dahulu."
        );
        return;
    }

    let daftarMenu = "";

    pesanan.forEach((item, index) => {

        const subtotal =
            item.harga * item.qty;

        daftarMenu += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.qty}</td>
                <td>
                    Rp ${subtotal.toLocaleString("id-ID")}
                </td>
            </tr>
        `;
    });

    document.getElementById("isiStruk")
        .innerHTML = `
            <p>
                <strong>Nama Pelanggan:</strong>
                ${namaPelanggan}
            </p>

            <p>
                <strong>Metode Pembayaran:</strong>
                ${metode}
            </p>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Menu</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    ${daftarMenu}
                </tbody>
            </table>

            <h5>
                Total :
                Rp ${total.toLocaleString("id-ID")}
            </h5>

            <div class="alert alert-success mt-3">
                Terima kasih telah berkunjung ke Cafe Inspirasi ☕
            </div>
        `;

    document
        .getElementById("struk")
        .classList.remove("d-none");

    // Reset Form
    pesanan = [];
    total = 0;

    document.getElementById("keranjang")
        .innerHTML = "";

    updateTotal();

    document.getElementById("namaPelanggan")
        .value = "";

    const checkbox =
        document.getElementById("confirmPaid");

    if (checkbox) {
        checkbox.checked = false;
    }
}

// =========================
// LOAD AWAL
// =========================
document.addEventListener(
    "DOMContentLoaded",
    function () {
        ubahPembayaran();
    }
);