const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

let contactsCollection;

async function getCollection() {
    if (!contactsCollection) {
        await client.connect();

        const database = client.db('contactbook');
        contactsCollection = database.collection('contacts');
    }

    return contactsCollection;
}

// Lấy tất cả liên hệ
exports.findAll = async () => {
    const collection = await getCollection();
    return await collection.find({}).toArray();
};

// Lấy liên hệ yêu thích
exports.findFavorite = async () => {
    const collection = await getCollection();
    return await collection.find({ favorite: true }).toArray();
};

// Xóa tất cả liên hệ
exports.deleteAll = async () => {
    const collection = await getCollection();
    return await collection.deleteMany({});
};

// Lấy một liên hệ theo ID
exports.findOne = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const collection = await getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
};

// Thêm liên hệ
exports.create = async (data) => {
    const collection = await getCollection();

    const contact = {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        favorite: Boolean(data.favorite),
    };

    const result = await collection.insertOne(contact);

    return await collection.findOne({ _id: result.insertedId });
};

// Cập nhật liên hệ
exports.update = async (id, data) => {
    if (!ObjectId.isValid(id)) return null;

    const collection = await getCollection();

    const contact = {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        favorite: Boolean(data.favorite),
    };

    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: contact }
    );

    if (result.matchedCount === 0) return null;

    return await collection.findOne({ _id: new ObjectId(id) });
};

// Xóa một liên hệ
exports.delete = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const collection = await getCollection();

    const result = await collection.deleteOne({
        _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
};