import React from 'react';
import {
    ListItem,
    ListItemPrefix,
    Typography,
    AccordionHeader,
    AccordionBody,
    List,
} from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const SidebarAccordion = ({ open, title, icon: Icon, items, onItemClick, onToggle }) => {
    return (
        <>
            <ListItem className="p-0" selected={open}>
                <AccordionHeader onClick={onToggle} className="border-b-0 p-3">
                    <ListItemPrefix>
                        <Icon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                        {title}
                    </Typography>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0 text-white">
                    {items.map((item, index) => (
                        <ListItem key={index} onClick={() => onItemClick(item.action)}>
                            <ListItemPrefix>
                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>
                            {item.label}
                        </ListItem>
                    ))}
                </List>
            </AccordionBody>
        </>
    );
};

export default SidebarAccordion;