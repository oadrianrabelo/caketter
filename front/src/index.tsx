import { useEffect, useState } from "react";
import { api } from '../services/API';
import { } from 'react-hook-form';
import { useForm } from "react-hook-form";
interface Costumer {
  id: number;
  name: string;
  contact: string;
}
interface FormValues {
  name: string;
  contact: string;
}

export default function Home() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [value, setValue] = useState(0);
  const {register, handleSubmit} = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    api.post(`costumer`, data)
    .then(() => {
      setValue(c=>c+1)
      alert('Registro salvo com sucesso')
    })
    .catch(() => alert('ERRO AO SALVAR'))
  } 
  
  useEffect(() => {
    api.get(`costumer`).then((res) => {
      // const costumer = res.data;
      setCostumers(res.data);
    });
  }, [value]);
  return (
    <div >
      <h1>TESTE</h1>
      { costumers.map((costumer) => {
        return(
          <div key={ costumer.id }>
            <label>{ costumer.name }</label>
            <label>{ costumer.contact }</label>
          </div>
        );
      })}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" { ...register('name') } />
        <input type="text" { ...register('contact') } />
        <button>botao</button>
      </form>
    </div>
  )
}