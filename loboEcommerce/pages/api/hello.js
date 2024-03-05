import db from "../../utils/db";// importa o banco de dados na paginas de api
export default function handler(req, res) {
  db.connectDb();//rodar o projeto
  db.disconnectDb();
//   res.status(200).json({ name: 'John Doe' })
}