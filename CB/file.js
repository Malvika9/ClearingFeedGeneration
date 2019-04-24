$.ajax({
    url: 'AllRecords.txt',
    dataType: 'text',
  }).done(successFunction);

  function successFunction(data) {
    var allRows = data.split(/\r?\n|\r/);
    console.log(allRows);
    var table = '<table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
      if (singleRow === 0) {
        table += '<thead>';
        table += '<tr>';
      } else {
        table += '<tr>';
      }
      var rowCells = allRows[singleRow].split(',');
      for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
        if (singleRow === 0) {
          table += '<th>';
          table += rowCells[rowCell];
          table += '</th>';
        } else {
          table += '<td>';
          table += rowCells[rowCell];
        //   console.log(rowCells[rowCell]);
          table += '</td>';
        }
      }
      if (singleRow === 0) {
        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
      } else {
        table += '</tr>';
      }
    } 
    table += '</tbody>';
    table += '</table>';
    $('body').append(table);
}

$(function(){
  $("tr").each(function(){
    var col_val = $(this).find("td:eq(7)").text();
    if (col_val == "valid"){
      
      $(this).addClass('selected');  //the selected class colors the row green//
    } else if(col_val == "invalid"){
      $(this).addClass('bad');
    }
    else{
      $(this).addClass('header');
    }
  });
});


