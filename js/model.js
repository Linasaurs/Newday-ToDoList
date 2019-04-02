var listOfItems = {
  items: [{
      id:"item0",
      description: "Do stuff",
      isStarred: false,
      isCompleted: false
    },
    {
      id: "item1",
      description: "Do more stuff",
      isStarred: false,
      isCompleted: false
    },
    {
      id: "item2",
      description: "Do Even more Stuff",
      isStarred: false,
      isCompleted: false
    }
  ],
  completed: 0,
  starred: 0,
  notCompleted: function () {
    return this.items.length - this.completed
  }
}

function saveItems() {
  localStorage.setItem('items', JSON.stringify(listOfItems.items));
  localStorage.setItem('completed', listOfItems.completed);
  localStorage.setItem('starred', listOfItems.starred);
}

function loadItems() {
  listOfItems.items = JSON.parse(localStorage.getItem('items') || JSON.stringify(listOfItems.items));
  listOfItems.completed = localStorage.getItem('completed') || 0;
  listOfItems.starred = localStorage.getItem('starred')||0;
}

var headerData = {
  pageTitle: "New day, new possibilties",
  headerIcon: "fa-sun"
}


loadItems();