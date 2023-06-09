import { useEffect, useState } from 'react'
import './App.css'
import Autenticacion from './components/Autenticacion'
import { auth, db, storage} from './config/firebase-config'
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  const [dataList, setDataList] = useState<Array<{ id: string; title: string; status: boolean; number: number; visible: boolean }>>([]);
  const [user, setUser] = useState<string>('');
  const [newDataTitle, setNewDataTitle] = useState<string>("");
  const [newDataNumber, setNewDataNumber] = useState<number>(0);
  const [newDataStatus, setNewDataStatus] = useState<boolean>(true);
  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const dataCollectionRef = collection(db, "data");

  const getDataList = async () => {
    try {
      const data = await getDocs(dataCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        status: doc.data().status,
        number: doc.data().number,
        visible: doc.data().visible
      }));
      setDataList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const onSubmitData = async () => {
    try {
      await addDoc(dataCollectionRef, {
        title: newDataTitle,
        status: newDataStatus,
        number: newDataNumber,
        visible: true,
        userId: auth?.currentUser?.uid
      });
      getDataList();
    } catch (err) {
      console.log(err);
    }
  }

  const onDeleteData = async (dataId: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar estos datos?");
    if (confirmed) {
      try {
        await deleteDoc(doc(dataCollectionRef, dataId));
        getDataList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleDataVisibility = async (dataId: string, visible: boolean) => {
    try {
      await updateDoc(doc(dataCollectionRef, dataId), {
        visible: !visible
      });
      getDataList();
    } catch (error) {
      console.error(error);
    }
  };

  const setUserName = (userName: string) => {
    setUser(userName);
  }

  const updateDataTitle = async (id: string) =>{
    const dataDoc = doc(db,"data",id);
    await updateDoc(dataDoc, {
      title: updateTitle})
    getDataList();
  }

  const uploadFile = async () =>{
    if(!fileUpload) return ;
    const filesFolderRef = ref(storage, `/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err){
      console.error(err)
    }
    getDataList();
  }

  return (
    <>
      <Autenticacion setUserName={setUserName} />
      {user && <p>Usuario: {user}</p>}
      <div className='setData'>
        <input type="text" placeholder="Title" onChange={(e) => setNewDataTitle(e.target.value)} />
        <input type="number" placeholder="Number" onChange={(e) => setNewDataNumber(Number(e.target.value))} />
        <select onChange={(e) => setNewDataStatus(e.target.value === "true")}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        <button onClick={onSubmitData}>Set data</button>
      </div>
      <div>
        {
          dataList.map((dataInfo) => (
            <div key={dataInfo.id}>
              {dataInfo.visible && (
                <>
                  <h1>Title: {dataInfo.title}</h1>
                  <p>Status: {dataInfo.status ? "Activo" : "Inactivo"}</p>
                  <p>Number: {dataInfo.number}</p>
                  <button onClick={() => toggleDataVisibility(dataInfo.id, dataInfo.visible)}>
                    {dataInfo.visible ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => onDeleteData(dataInfo.id)}>Delete data</button>
                  <input type="text" placeholder='ingrese nuevo titulo...' onChange={(e) => setUpdateTitle(e.target.value)}/>
                  <button onClick={() => updateDataTitle(dataInfo.id)}>Update Title</button>
        <div>
        <input type="file" onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFileUpload(e.target.files[0]);
          }
          }}/>
          <button onClick={
            uploadFile
          }>Upload File</button>
        </div>
                </>
              )}
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
