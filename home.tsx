import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
    };
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/documents/upload', formData);
      setUploadResult(response.data);
      setDocuments((prevDocs) => [...prevDocs, response.data]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erro ao enviar o arquivo. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/documents/${id}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `documento_${id}.txt`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erro ao baixar o documento:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload de Nota Fiscal</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button 
        onClick={handleUpload} 
        disabled={isUploading} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isUploading ? 'Enviando...' : 'Enviar'}
      </button>

      {uploadResult && (
        <div className="mt-4 p-2 bg-green-100 border border-green-400 rounded">
          <p><strong>Texto Extraído:</strong></p>
          <p>{uploadResult.extractedText}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-bold">Documentos Enviados</h2>
        <ul className="mt-2">
          {documents.map((doc) => (
            <li key={doc.id} className="mt-2 p-2 border rounded bg-gray-100">
              <p><strong>ID:</strong> {doc.id}</p>
              <button 
                onClick={() => handleDownload(doc.id)}
                className="text-blue-500 underline"
              >
                Baixar Documento
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
