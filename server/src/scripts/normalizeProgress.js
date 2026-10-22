import mongoose from 'mongoose';

async function fixTracker() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookbridge_db');
  const collection = mongoose.connection.db.collection('readingprogresses');

  const docs = await collection.find({}).toArray();
  console.log(`Found ${docs.length} reading progress documents.`);

  for (const doc of docs) {
    const isCompleted = doc.status === 'Completed';
    const newTotal = 3;
    const newPage = isCompleted ? 3 : Math.min(Number(doc.currentPage) || 0, 3);
    const newPercentage = Math.min(100, Math.round((newPage / newTotal) * 100));

    await collection.updateOne(
      { _id: doc._id },
      {
        $set: {
          totalPages: newTotal,
          currentPage: newPage,
          percentage: newPercentage
        }
      }
    );
    console.log(`Updated ${doc.bookId}: status=${doc.status}, page=${newPage}/${newTotal} (${newPercentage}%)`);
  }

  await mongoose.disconnect();
  console.log('Done normalizing database records!');
}

fixTracker().catch(console.error);
