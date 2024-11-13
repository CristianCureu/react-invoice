import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, useState } from "react";

import { setSelectedInvoice, toggleModal, closeModal } from "../redux/invoiceSlice";
import { Invoice } from "../types/invoiceTypes";
import { fetchInvoices } from "../api/requests";
import { RootState } from "../redux/store";
import Modal from "./Modal";

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { selectedInvoice, isModalOpen } = useSelector(
    (state: RootState) => state.invoice
  );
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: invoices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetchInvoices(page, limit),
    staleTime: Infinity,
  });

  const handleOpenModal = (invoice: Invoice) => {
    dispatch(setSelectedInvoice(invoice));
    dispatch(toggleModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Invoice List</h2>
      <div style={cardContainerStyle}>
        {invoices?.map((invoice) => (
          <div
            key={invoice.id}
            style={cardStyle}
            onClick={() => handleOpenModal(invoice)}
          >
            <div style={invoiceDetailsStyle}>
              <h3 style={vendorNameStyle}>{invoice.vendorName}</h3>
              <p style={amountStyle}>${invoice.amount.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={paginationControlsStyle}>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          style={paginationButtonStyle}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={!invoices || invoices.length < limit}
          style={paginationButtonStyle}
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedInvoice && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div>{selectedInvoice.description}</div>
        </Modal>
      )}
    </div>
  );
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#f7f8fc",
};

const headerStyle: CSSProperties = {
  fontSize: "1.8rem",
  color: "#333",
  marginBottom: "20px",
};

const cardContainerStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  justifyContent: "center",
  maxWidth: "800px",
  width: "100%",
};

const cardStyle: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  width: "calc(100% - 20px)",
  maxWidth: "250px",
  textAlign: "center",
  border: "1px solid #e0e0e0",
};

const invoiceDetailsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const vendorNameStyle: CSSProperties = {
  fontSize: "1.1rem",
  color: "#333",
  marginBottom: "4px",
};

const amountStyle: CSSProperties = {
  fontSize: "1rem",
  color: "#4CAF50",
};

const paginationControlsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
};

const paginationButtonStyle: CSSProperties = {
  padding: "8px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default InvoiceList;
