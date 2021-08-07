async function asyncF() {
  console.log(1);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });
  console.log(3);
}

console.log(4);
asyncF();
console.log(5);

// 4 > 1 > 5 > 2 > 3;
// 先執行12行 >
//   進入function執行2行 >
//   log2被丟去等待 >
//   log3用await >
//   執行14行 >
//   沒有東西後執行第5行 >
//   全部跑完log3才出來;
