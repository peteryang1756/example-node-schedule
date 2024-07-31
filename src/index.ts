import express from 'express';
import axios from 'axios';
import schedule from 'node-schedule';

const app = express();
const port = process.env.PORT || 3000;

// 定義要請求的 URL
const url = 'http://ssport.x10.mx/help/help/api/rcron.php';

// 設定每 5 秒執行一次的排程
schedule.scheduleJob('*/5 * * * * *', async () => {
  try {
    console.log('發送請求:', url);
    const response = await axios.get(url);
    console.log('請求成功:', response.data);

    // 保持連接 5 秒
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('等待 5 秒...');
  } catch (error) {
    console.error('請求失敗:', error);
  }
});

// 設定基本的 Express 伺服器
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
