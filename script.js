const apiUrl = 'https://crudcrud.com/api/af259030e6304552a5a1a802159e80dc/products'; 

async function fetchAndDisplayProducts() {
    const productList = document.getElementById('productList');
    const totalValue = document.getElementById('totalValue');
    productList.innerHTML = '';
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        let totalPrice = 0;

        data.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                Product Name: ${product.productName}
                Selling Price: ${product.sellingPrice.toFixed(2)}
                <button onclick="deleteProduct('${product._id}')">Delete</button>
            `;
            productList.appendChild(li);
            totalPrice += product.sellingPrice;
        });

        totalValue.textContent = `${totalPrice.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function addProduct() {
    const productName = document.getElementById('productName').value;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);

    if (productName.trim() === '' || isNaN(sellingPrice) || sellingPrice <= 0) {
        alert('Please enter a valid product name and selling price.');
        return;
    }

    const productData = {
        productName,
        sellingPrice
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            document.getElementById('productName').value = '';
            document.getElementById('sellingPrice').value = '';
            fetchAndDisplayProducts();
        } else {
            console.error('Failed to add product:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchAndDisplayProducts();
        } else {
            console.error('Failed to delete product:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

fetchAndDisplayProducts();
