// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);

// 4>1>3>5>2
// 先執行12行>13行>進入function執行4行 7在等待所以先9在來14 沒東西了在拿7出來
