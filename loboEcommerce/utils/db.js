import mongoose, { mongo } from "mongoose";//importa a dependencia do banco de dados
const connection = {};//criando a prorpia conexão com mongodb

async function connectDb() {
    if (connection.isConnected) {//se estiver conectado a aplicação
      console.log("Already connected to the database.");
      return;//retorna
    }
    if (mongoose.connections.length > 0) {//se for mais que 0 conexoes
      connection.isConnected = mongoose.connections[0].readyState;//esta conectado
      if (connection.isConnected === 1) {//se for apenas igual 1 conexão
        console.log("Use previous connection to the database.");
        return;
      }
      await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGODB_URL, {//url do mongo db coloca no connect como um párametro
      useNewUrlParser: true,//para usar a url coloca true ambos
      useUnifiedTopology: true,
    });
    console.log("New connection to the database.");
    connection.isConnected = db.connections[0].readyState;
  }

  async function disconnectDb() {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === "production") {//if (process.env.NODE_END === "production") {//se estiver conectado e 
        await mongoose.disconnect();//disconectar
        connection.isConnected = false;
      } else {
        console.log("not diconnecting from the database.");
      }
    }
  }

  const db = { connectDb, disconnectDb };
export default db;