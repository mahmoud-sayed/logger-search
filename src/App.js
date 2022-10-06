import './App.css';
import TableDesign from './components/Table/TableDesign';
import { Container, Divider } from '@mui/material';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';


function App() {
  return (
    <div className='background' >
      <Container maxWidth='xl'>
        <Breadcrumb />
        <Divider sx={{ margin: '1rem 0px' }} />
        <TableDesign />
      </Container>
    </div>
  );
}

export default App;
