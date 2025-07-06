import React from "react";

export default function Copyright() {
    return (
        <div className="shrink-0 text-sm p-3 transition-all translate-x-2 text-[#555555]">
            Powered by{" "}
            <a
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-800">
                ABC, Inc
            </a>
            . Copyright &copy; {new Date().getFullYear()}{" "}
        </div>
    );
}
