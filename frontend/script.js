async function searchItem() {
  const item = document.getElementById('search').value.trim();
  console.log("Searching for:", item);

  if (!item) {
    alert("Please enter a grocery item to search.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5050/api/items/search?name=${item}`);
    const data = await res.json();
    console.log("Received data:", data);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.length === 0) {
      resultsDiv.innerHTML = `<p>No items found for "${item}".</p>`;
    } else {
      data.forEach(item => {
        resultsDiv.innerHTML += `
          <div class="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <h2 class="font-bold">${item.name}</h2>
              <p>$${item.price.toFixed(2)} - ${item.store}</p>
              <small>${item.location}</small>
            </div>
            ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" class="h-16 w-16 object-cover">` : ''}
          </div>
        `;
      });
    }
  } catch (err) {
    console.error("Error during fetch:", err);
    document.getElementById('results').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}
