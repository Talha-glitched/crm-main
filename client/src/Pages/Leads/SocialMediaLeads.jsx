import React, { useState } from "react";
import Topbar from "../Leads/Topbar";
import { Table } from "../../Components";
import { CCallout } from "@coreui/react";
import { Tooltip } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import { styled } from "@mui/system";
import moment from "moment";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import UpdateStatusModal from "./UpdateStatus";
import ShiftLeadModal from "./ShiftLead";
import ShareLeadModal from "./shareLead";
import Filter from "./Filter";
import Kanban from "./Kanban/Kanban";
import Attachments from "./Attachments/Attachments";
///asd

// TODO: Backend Integration
// 1. Create API endpoints for social media leads CRUD operations
// 2. Implement Redux actions and reducers for state management
// 3. Add authentication and authorization middleware
// 4. Implement real-time updates for lead status changes
// 5. Add API integration for social media platforms

// Styling constants
const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

// Styled components for the dropdown menu
const StyledListbox = styled("ul")(
  ({ theme }) => `
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      transition:all;
      padding: 10px;
      margin: 12px 0;
      width: auto;
      border-radius: 12px;
      overflow: auto;
      outline: 0px;
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      box-shadow: 0px 4px 30px ${theme.palette.mode === "dark" ? grey[900] : grey[200]};
      z-index: 1;
      `
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      &:last-of-type {
        border-bottom: none;
      }
    
      &.${menuItemClasses.focusVisible} {
        outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
        background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      }
    
      &.${menuItemClasses.disabled} {
        color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
      }
    
      &:hover:not(.${menuItemClasses.disabled}) {
        background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      }
      `
);

// Mock data for frontend implementation
const mockLeads = [
  {
    _id: "1",
    uid: "SM001",
    clientName: "John Doe",
    clientPhone: "+1234567890",
    createdAt: new Date(),
    priority: "high",
    status: "new",
    platform: "facebook",
    campaign: "Summer Sale 2024",
    adSpend: 500,
    impressions: 10000,
    clicks: 250,
    conversions: 5,
    allocatedTo: [{ _id: "1", username: "Agent 1" }],
    project: { title: "Project A" }
  },
];

function SocialMediaLeads({ type, showSidebar }) {
  // TODO: Replace with Redux state management
  const [openAttachmentModal, setOpenAttachmentModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openShiftLeadModal, setOpenShiftLeadModal] = useState(false);
  const [openShareLeadModal, setOpenShareLeadModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [options, setOptions] = useState({
    isKanbanView: false,
    showEmployeeLeads: false,
    showArchivedLeads: false,
  });

  // TODO: Replace with actual API data and loading state
  const leads = mockLeads;
  const isFetching = false;
  const loggedUser = { role: "admin" };

  // Table column definitions with social media specific fields
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (params) => <div className="font-primary font-light">{params.row?.uid}</div>,
    },
    // Social media specific columns
    {
      field: "platform",
      headerName: "Platform",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div className="capitalize font-primary font-light">{params.row?.platform}</div>
      ),
    },
    {
      field: "campaign",
      headerName: "Campaign",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <div className="capitalize font-primary font-light">{params.row?.campaign}</div>
      ),
    },
    {
      field: "adSpend",
      headerName: "Ad Spend",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div className="font-primary font-light">${params.row?.adSpend}</div>
      ),
    },
    {
      field: "impressions",
      headerName: "Impressions",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div className="font-primary font-light">{params.row?.impressions.toLocaleString()}</div>
      ),
    },
    {
      field: "clicks",
      headerName: "Clicks",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => (
        <div className="font-primary font-light">{params.row?.clicks.toLocaleString()}</div>
      ),
    },
    {
      field: "conversions",
      headerName: "Conversions",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div className="font-primary font-light">{params.row?.conversions}</div>
      ),
    },
    // Standard lead columns
    {
      field: "clientName",
      headerName: "Client Name",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => (
        <div className="text-[#20aee3] hover:text-[#007bff] capitalize cursor-pointer font-primary font-light">
          {params.row?.clientName}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <span className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize font-primary font-medium 
          ${params.row?.status == "new" ? "border-rose-700 text-rose-700" : ""}
          ${params.row?.status == "contacted" ? "border-yellow-500 text-yellow-500" : ""}
          ${params.row?.status == "qualified" ? "border-green-500 text-green-500" : ""}
          ${params.row?.status == "converted" ? "border-blue-500 text-blue-500" : ""}`}>
          {params.row?.status}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: (params) => (
        <div className="flex gap-[10px] items-center transition-all">
          {loggedUser?.role != "employee" && (
            <Tooltip placement="top" title="Delete">
              <PiTrashLight
                onClick={() => handleOpenDeleteModal(params.row?._id)}
                className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
              />
            </Tooltip>
          )}
          <Tooltip placement="top" title="View">
            <div className="cursor-pointer" onClick={() => handleOpenViewModal(params.row?._id)}>
              <IoOpenOutline className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400" />
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Edit">
            <CiEdit
              onClick={() => handleOpenEditModal(params.row)}
              className="cursor-pointer text-green-500 text-[23px] hover:text-green-600"
            />
          </Tooltip>

          <Dropdown>
            <Tooltip title="More" arrow placement="top">
              <MenuButton>
                <PiDotsThreeOutlineThin className="cursor-pointer text-[23px] text-gray-500 hover:text-gray-700" />
              </MenuButton>
            </Tooltip>

            <Menu slots={{ listbox: StyledListbox }}>
              <StyledMenuItem
                className="text-gray-600 flex font-primary"
                onClick={() => handleOpenStatusModal(params.row)}>
                Update Status
              </StyledMenuItem>
              <StyledMenuItem
                className="text-gray-600 flex font-primary"
                onClick={() => handleOpenShiftLeadModal(params.row)}>
                Shift Lead
              </StyledMenuItem>
              <StyledMenuItem
                className="text-gray-600 flex font-primary"
                onClick={() => handleOpenShareLeadModal(params.row)}>
                {params.row?.allocatedTo?.length > 0 ? 'Share Lead' : 'Allocate Lead'}
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => handleOpenAttachmentModal(params.row._id)}
                className="text-gray-600 flex font-primary">
                Attachments
              </StyledMenuItem>
            </Menu>
          </Dropdown>
        </div>
      ),
    },
  ];

  // TODO: Implement these handlers with actual API calls
  const handleOpenAttachmentModal = (leadId) => {
    setSelectedLeadId(leadId);
    setOpenAttachmentModal(true);
  };

  const handleOpenEditModal = (lead) => {
    setOpenEditModal(true);
    // TODO: Implement lead selection in Redux
    // dispatch(setCurrentLead(lead));
  };

  const handleOpenStatusModal = (lead) => {
    setOpenStatusModal(true);
    // TODO: Implement lead selection in Redux
    // dispatch(setCurrentLead(lead));
  };

  const handleOpenShiftLeadModal = (lead) => {
    setOpenShiftLeadModal(true);
    // TODO: Implement lead selection in Redux
    // dispatch(setCurrentLead(lead));
  };

  const handleOpenShareLeadModal = (lead) => {
    setOpenShareLeadModal(true);
    // TODO: Implement lead selection in Redux
    // dispatch(setCurrentLead(lead));
  };

  const handleOpenDeleteModal = (leadId) => {
    setOpenDeleteModal(true);
    setSelectedLeadId(leadId);
  };

  const handleOpenViewModal = (leadId) => {
    // TODO: Implement view logic with routing
    // navigate(`/social-media-leads/${leadId}`);
    console.log("View lead:", leadId);
  };

  // TODO: Implement useEffect for data fetching
  // useEffect(() => {
  //   dispatch(getSocialMediaLeads());
  // }, []);

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} leadId={selectedLeadId} />
      <UpdateStatusModal open={openStatusModal} setOpen={setOpenStatusModal} />
      <ShiftLeadModal open={openShiftLeadModal} setOpen={setOpenShiftLeadModal} />
      <ShareLeadModal open={openShareLeadModal} setOpen={setOpenShareLeadModal} />
      <Filter open={openFilters} setOpen={setOpenFilters} setIsFiltered={setIsFiltered} />
      <Attachments
        open={openAttachmentModal}
        setOpen={setOpenAttachmentModal}
        leadId={selectedLeadId}
      />

      <Topbar
        options={options}
        setOptions={setOptions}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        setIsFiltered={setIsFiltered}
        isFiltered={isFiltered}
      />

      {options.isKanbanView ? (
        <Kanban options={options} setOptions={setOptions} />
      ) : (
        <CCallout color="primary">
          <Table
            rows={leads}
            columns={columns}
            rowsPerPage={10}
            isFetching={isFetching}
            showSidebar={showSidebar}
          />
        </CCallout>
      )}
    </div>
  );
}

export default SocialMediaLeads;