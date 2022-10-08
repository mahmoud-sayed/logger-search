import './App.css';
import TableDesign from './components/Table/TableDesign';
import { Container, Divider } from '@mui/material';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import EnhancedTable from './components/testTable';


function App() {
  return (
    <div className='background' >
      <Container maxWidth='xl'>
        <Breadcrumb />
        <Divider sx={{ margin: '1rem 0px' }} />
        <TableDesign />
        {/* <EnhancedTable /> */}
      </Container>
    </div>
  );
}

export default App;
