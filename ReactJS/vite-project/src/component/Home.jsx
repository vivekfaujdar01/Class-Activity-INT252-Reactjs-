export default function Home({ information }) {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold ">
          Welcome to Home Component {information.name}, age {information.age} and  {information.occupation}
        </h1>
        <p className="text-lg mt-4">
          This is the home page of our React application.
        </p>
      </div>
    </>
  );
}
