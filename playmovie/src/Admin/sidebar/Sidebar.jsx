import React, { useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    InboxIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


function Sidebar({ onContentChange }) {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const movieManagementItems = [
        { label: 'Danh Sách', action: 'movie-list' },
        { label: 'Thêm', action: 'add-movie' },
        { label: 'PreView', action: 'preview' }
    ];

    const eCommerceItems = [
        { label: 'Orders', action: 'orders' },
        { label: 'Products', action: 'products' }
    ];

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-slate-800 text-white shadow-blue-gray-900/5">
            {/* ... */}
            <List>
                {/* ... */}
                <Accordion open={open === 1} >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Quản Lý Movie
                            </Typography>
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                            />
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0 text-white">
                            {movieManagementItems.map((item, index) => (
                                <ListItem key={index} onClick={() => onContentChange(item.action)}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    {item.label}
                                </ListItem>
                            ))}
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion open={open === 2} >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                E-Commerce
                            </Typography>
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                            />
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0 text-white">
                            {eCommerceItems.map((item, index) => (
                                <ListItem key={index} onClick={() => onContentChange(item.action)}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    {item.label}
                                </ListItem>
                            ))}
                        </List>
                    </AccordionBody>
                </Accordion>

                {/* ... */}
            </List>
        </Card>
    );
}

export default Sidebar;