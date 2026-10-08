const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
mongoose.connect('mongodb+srv://vishalratanshakya_db_user:Lc0wzM3Sp3KBKYhc@sujatafinejewels.zm1kt7n.mongodb.net/sujatafinejewels?retryWrites=true&w=majority').then(async () => {
  const db = mongoose.connection.db;
  const banners = db.collection('herobanners');
  const b1 = await banners.findOne({ id: 1 });
  if (b1 && b1.image && b1.image.startsWith('data:image')) {
    const base64Data = b1.image.replace(/^data:image\/\w+;base64,/, '');
    const dir = path.join(process.cwd(), 'public', 'images', 'hero');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'hero_1.jpg'), base64Data, 'base64');
    
    await banners.updateOne({ id: 1 }, { $set: { image: '/images/hero/hero_1.jpg' } });
    console.log('Updated in DB');
  } else {
    console.log('Not found or not base64');
  }
  mongoose.disconnect();
});
