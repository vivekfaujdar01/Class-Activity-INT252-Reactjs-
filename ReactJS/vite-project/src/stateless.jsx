import React from "react";

/**
 * Stateless functional component example
 * Usage:
 * <Stateless title="Hi" onClick={() => alert('clicked')}>Optional children</Stateless>
 */
const Stateless = ({ title = "Stateless Component", children = null, onClick }) => {
    return (
        <section className="stateless-component bg-blue-100" style={{ padding: 16, border: "1px solid #ddd" }}>
            <h2 style={{ margin: "0 0 8px" }}>{title}</h2>
            <div style={{ marginBottom: 12 }}>{children ?? <p>No children provided.</p>}</div>
            {onClick ? (
                <button type="button" onClick={onClick} className="bg-red-200">
                    Action
                </button>
            ) : null}
        </section>
    );
};

export default Stateless;