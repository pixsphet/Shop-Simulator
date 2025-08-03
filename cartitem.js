  const products = [
    { id: 101, 
      name: 'หูฟังบลูทูธ Sony', 
      category: 'Electronics', 
      price: 4590, 
      stock: 15 
  },
    { id: 102, 
      name: 'คีย์บอร์ด Mechanical', 
      category: 'Electronics', 
      price: 2800, 
      stock: 8 
  },
    { id: 201, 
      name: 'หนังสือ The Pragmatic Programmer', 
      category: 'Books', 
      price: 850, 
      stock: 30 
  },
    { id: 202, 
      name: 'หนังสือ Clean Code', 
      category: 'Books', 
      price: 799, 
      stock: 0 
  }, // สินค้าหมด
    { id: 301, 
      name: 'แก้วกาแฟ Starbucks', 
      category: 'Lifestyle', 
      price: 550, 
      stock: 25 
  }
  ];

  const user = {
    name: 'สมศักดิ์',
    shoppingCart: [
      { productId: 101, quantity: 1 }, 
      { productId: 201, quantity: 2 }, 
      { productId: 102, quantity: 1 }, 
      { productId: 202, quantity: 1 }, 
    ]
  };

  function processOrder (customer, productList){
      console.log(" ");
      console.log(`===== เริ่มสำรวจตระกร้าสินค้า =====`);

      const enrichedCart = customer.shoppingCart.map((item) => {
          const productDetails = productList.find((p) => p.id === item.productId)
          console.log(productDetails);

          if (productDetails.stock < item.quantity){
                  console.log(`สินค้า ${productDetails.name} ไม่พร้อมจำหน่าย ของอาจจะหมดStock`
                  );
                  return null;
          }
          return{
              ...productDetails,
              quantity: item.quantity,
              subtotal: productDetails.price * item.quantity
          }
      });
          const availableItems = enrichedCart.filter((item) => item != null ) //remove สินค้าออก ที่ไม่ใช่ null
          const totalPrice = availableItems.reduce((total, item) => total + item.subtotal, 0);
          
          const sortedItem = availableItems.sort((a, b) => b.price - a.price)

          console.log("====== สรุปรายการสั่งซื้อ ======")
              sortedItem.forEach(item => {
                  console.log(` -${item.name} x ${item.quantity} | ราคา ${item.subtotal.toLocaleString()} ฿`);
              });
          // เอา availableItems ไปหาราคารวม totalPrice พร้อมทั้งจัดเรียงสินค้าจากราคามากไปน้อย
      
          // ใช้ for.each หรือ for..of สรุปคำสั่งซื้อ เช่น หูฟังบลูธูท Sony x 1 | ราคา 4,500฿
          // ท้านสุด แสดงราคารวมสุทธิ 

          console.log("------------------------------------------------");
          console.log(` 💸ราคารวมสุทธิ ${totalPrice.toLocaleString()} ฿`);
          console.log("------------------------------------------------");

  }

  processOrder(user, products);