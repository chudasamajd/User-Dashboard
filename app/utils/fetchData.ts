import { collection, getDocs } from "firebase/firestore";
import Papa from "papaparse";
import { db } from "../firebase/firebaseConfig";

export const fetchDataAndConvertToCSV = async (): Promise<string> => {
  const querySnapshot = await getDocs(collection(db, "emails"));
  const data: any[] = [];

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const csv = Papa.unparse(data);
  return csv;
};
