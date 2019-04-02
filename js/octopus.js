/////////// Model Logic ///////////
function addListItemToModel() {
  var itemText = $("#input-item-box").val()
  if (itemText.replace(/\s/g, '').length) {
    var item = {
      id: "item".concat(listOfItems.items.length + 1),
      description: itemText,
      isStarred: false,
      isCompleted: false
    }
    listOfItems.items.push(item)
    renderStats()
    renderList()
  }
}

function findItemIndex(item) {
  return listOfItems.items.findIndex(i => i.description == item)
}

function addCompletedForItem(index, date) {
  listOfItems.items[index].isCompleted = true;
  listOfItems.items[index].dateCompleted = date;
  listOfItems.completed++
}

function removeCompletedForItem(index) {
  listOfItems.items[index].isCompleted = false;
  listOfItems.items[index].dateCompleted = null
  listOfItems.completed--
}

function toggleStarredforItem(index) {
  listOfItems.items[index].isStarred = !listOfItems.items[index].isStarred;
}

function updateStarredCount(){
  listOfItems.starred = $(".fa-star.fas").length;
}
/////////// Adding Listners ///////////

function checkBoxListner() {
  $('.checkbox').change(function () {
    var index = findItemIndex($(this).parent().find(".to-do-list-txt").text())
    if (this.checked) {
      let date = new Date().toISOString()
      addCompletedForItem(index, date)
      renderCompletedItem(listOfItems.items[index].id, true, date)
    } else {
      removeCompletedForItem(index)
      renderCompletedItem(listOfItems.items[index].id, false)
    }
    renderStats()
    saveItems()
  });
}

$(document).keyup(function enterKeyListner(event) {
  if ($("#input-item-box").is(":focus") && event.key == "Enter") {
    addListItemToModel()
    $("#input-item-box").val('')
  }
})

function addStarListner() {
  $(".fa-star").click(function () {
    var index = findItemIndex($(this).parent().parent().find(".to-do-list-txt").text())
    $(this).toggleClass("fas")
    toggleStarredforItem(index)
    updateStarredCount()
    renderStats()
    saveItems();
  })
}

function addDeleteListner() {
  $(".fa-trash").click(function () {
    var index = findItemIndex($(this).parent().parent().find(".to-do-list-txt").text())
    if (listOfItems.items[index].isCompleted)
    {
      removeCompletedForItem(index)
    }
    listOfItems.items.splice(index, 1)
    $(this).parent().parent().remove()
    updateStarredCount()
    renderStats()
    saveItems();
  })
}

function addEditListner() {
  $(".fa-edit").click(function () {
    var self = $(this).parent().parent()
    self.find(".to-do-list-txt").hide()
    self.find("input[type=text]").show()
    self.find("input[type=text]").val($(this).parent().parent().find(".to-do-list-txt").text())
    $(document).keypress(function (e) {
      if (e.which == 13) {
        newValue = self.find("input[type=text]").val()
        if (newValue && newValue.replace(/\s/g, '').length) {
          self.find(".to-do-list-txt").text(newValue)
          var thisIndex = self.index()
          listOfItems.items[thisIndex].description = newValue
          self.find(".to-do-list-txt").show()
          self.find("input[type=text]").hide()
          saveItems();
        }
      }
    });
  });
}

function addListners() {
  addStarListner()
  checkBoxListner()
  addDeleteListner()
  addEditListner()
}

function makeListSortable() {
  var originalIndex;
  $("#to-do-list").sortable().on("sortstart", function (event, ui) {
    originalIndex = ui.item.index();
  });

  $("#to-do-list").sortable().on("sortstop", function (event, ui) {
    var removedItem = listOfItems.items.splice(originalIndex, 1)
    listOfItems.items.splice(ui.item.index(), 0, removedItem[0])
    saveItems()
  });;
  $("#to-do-list").disableSelection();
}

/////////// Rendering Functions ///////////

function renderCompletedItem(itemId, isChecked, date) {
  $(`#${itemId}`).find(".to-do-list-txt").toggleClass("line-through")
  if (isChecked) {
    $(`#${itemId}`).find(".timestamp").text("done@(" + date + ")")
  } else {
    $(`#${itemId}`).find(".timestamp").text("")
  }
}

function renderHeader() {
  var header = Mustache.render(headerTemplate, headerData);
  $("body").append(header);
  $("body").append(inputTextBox);
}

function renderStats(){
  $(".stats").remove()
  var stats = Mustache.render(statsTemplate, listOfItems);
  $(stats).insertBefore("#to-do-list")
}

function renderList() {
  $("#to-do-list").remove()
  var toDoList = Mustache.render(toDoListTemplate, listOfItems);
  $("body").append(toDoList);
  $.each(listOfItems.items, function (index, value) {
    if (value.isCompleted) {
      $(`#${value.id}`).find('.checkbox').attr("checked", true)
      renderCompletedItem(value.id, true, value.dateCompleted)
    }
    if (value.isStarred) {
      $(`#${value.id}`).find('.fa-star').toggleClass("fas")
    }
  });
  $("#to-do-list").find("input[type='text']").hide()
  makeListSortable()
  addListners()
  saveItems();
}

$(document).ready(
  function () {
    renderHeader()
    renderList()
    renderStats()
  }
)
