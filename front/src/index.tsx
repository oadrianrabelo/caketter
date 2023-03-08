import Card from "./utils/Card";

export default function Home() {
  return (
    <>
      <div className="flex">
        <ul className="grid w-full gap-8 md:grid-cols-3">
          <p>
            Crie uma conta <a href="/signup">agora!</a>
          </p>
          <Card
            title="Organize seus pedido"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum harum quam laudantium, corrupti culpa nostrum explicabo dolor a id libero ratione necessitatibus. Numquam perferendis molestiae praesentium vero, quisquam necessitatibus consectetur!"
            image="https://flowbite.com/docs/images/blog/image-1.jpg"
          />
          <Card
            title="Armazene dados dos seus clientes"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum harum quam laudantium, corrupti culpa nostrum explicabo dolor a id libero ratione necessitatibus. Numquam perferendis molestiae praesentium vero, quisquam necessitatibus consectetur!"
            image="https://flowbite.com/docs/images/blog/image-1.jpg"
          />
          <Card
            title="Salve seus bolos preferidos"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum harum quam laudantium, corrupti culpa nostrum explicabo dolor a id libero ratione necessitatibus. Numquam perferendis molestiae praesentium vero, quisquam necessitatibus consectetur!"
            image="https://flowbite.com/docs/images/blog/image-1.jpg"
          />
          <Card
            title="Não se preocupe com seus dados, eles serão salvos para você"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum harum quam laudantium, corrupti culpa nostrum explicabo dolor a id libero ratione necessitatibus. Numquam perferendis molestiae praesentium vero, quisquam necessitatibus consectetur!"
            image="https://flowbite.com/docs/images/blog/image-1.jpg"
          />
          <Card
            title="Precisa de ajuda?"
            textButton="Contate o suporte!"
            image="https://flowbite.com/docs/images/blog/image-1.jpg"
          />
        </ul>
      </div>
    </>
  );
}
