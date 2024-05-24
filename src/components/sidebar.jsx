import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, List, ListItem, ListItemText } from '@mui/material';


const Sidebar = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <List> 
                <ListItem button onClick={() => navigate('/history')}  sx={{background:'#D7C7F4',textAlign:'center',}}>
                    <img src="" alt="" />
                    <Button >New Chat</Button>
                </ListItem>
                <ListItem button onClick={() => navigate('/history')}>
                    <ListItemText sx={{background:'#D7C7F4' ,textAlign:'center',borderRadius:'5px'}} primary="Past Conversations" />
                </ListItem>
                <ListItem>
                   
                </ListItem>
            </List>
        </Drawer>
    );
};
export default Sidebar

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, Toolbar, AppBar } from '@mui/material';
// import { IoMenu } from "react-icons/io5";

// const Sidebar = ({ darkMode, setDarkMode }) => {
//     const navigate = useNavigate();
//     const isMobile = useMediaQuery('(max-width:600px)');
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };

//     const drawerContent = (
//         <List>
//             <ListItem button onClick={() => navigate('/')} sx={{ textAlign: 'center' }}>
//                 <Button>New Chat</Button>
//             </ListItem>
//             <ListItem button onClick={() => navigate('/history')}>
//                 <ListItemText sx={{ textAlign: 'center', borderRadius: '5px' }} primary="Past Conversations" />
//             </ListItem>
//         </List>
//     );

//     const drawerStyles = {
//         boxSizing: 'border-box',
//         width: 240,
        
//     };

//     return (
//         <div style={{backgroundColor: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)',}}>
//             {isMobile ? (
//                 <>
//                     <AppBar position="fixed" sx={{background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)',}}>
//                         <Toolbar>
//                             <IconButton
//                                 color="inherit"
//                                 aria-label="open drawer"
//                                 edge="start"
//                                 onClick={handleDrawerToggle}
//                                 sx={{ mr: 2 }}
//                             >
//                                 <IoMenu />
//                             </IconButton>
//                         </Toolbar>
//                     </AppBar>
//                     <Drawer
//                         variant="temporary"
//                         open={mobileOpen}
//                         onClose={handleDrawerToggle}
//                         ModalProps={{
//                             keepMounted: true, // Better open performance on mobile.
//                         }}
//                         sx={{ [`& .MuiDrawer-paper`]: drawerStyles }}
//                     >
//                         {drawerContent}
//                     </Drawer>
//                 </>
//             ) : (
//                 <Drawer
//                     variant="permanent"
//                     sx={{
//                         [`& .MuiDrawer-paper`]: drawerStyles,
//                     }}
//                 >
//                     {drawerContent}
//                 </Drawer>
//             )}
//         </div>
//     );
// };

// export default Sidebar;