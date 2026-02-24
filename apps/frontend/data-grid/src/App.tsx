import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <main className="h-screen min-h-0 flex flex-col p-8">
      <Header />

      <div className="flex min-h-0 flex-1 w-full gap-8 overflow-hidden">
        <Sidebar />
        <Main />
      </div>
    </main>
  );
}

export default App;
