// src/pages/Dashboard/SimplifiedToolbar.tsx
import React from "react";
import {
    Plus,
    Save,
    Undo,
    Redo,
    Settings,
    Share2,
    Download,
    MoreHorizontal,
    X,
    Edit3,
} from "lucide-react";
import { Button } from "../../components/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/Dropdown";
import { cn } from "../../utils";

interface DashboardToolbarProps {
    isEditing: boolean;
    hasUnsavedChanges: boolean;
    canUndo: boolean;
    canRedo: boolean;
    onStartEdit: () => void;
    onAddWidget: () => void;
    onSave: () => void;
    onCancel: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onShare: () => void;
    onExport: () => void;
    onSettings: () => void;
}

export const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
    isEditing,
    hasUnsavedChanges,
    canUndo,
    canRedo,
    onAddWidget,
    onStartEdit,
    onSave,
    onCancel,
    onUndo,
    onRedo,
    onShare,
    onExport,
    onSettings,
}) => {
    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-30">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
                {/* Edit Mode Actions */}
                {isEditing ? (
                    <div className="flex items-center space-x-4">
                        {/* Add Widget - Primary action in edit mode */}
                        <Button
                            onClick={onAddWidget}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Widget
                        </Button>

                        {/* History Controls */}
                        <div className="h-6 w-px bg-gray-300" />
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onUndo}
                                disabled={!canUndo}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                                title="Undo (Ctrl+Z)">
                                <Undo className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onRedo}
                                disabled={!canRedo}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                                title="Redo (Ctrl+Y)">
                                <Redo className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Status Indicator */}
                        {hasUnsavedChanges && (
                            <>
                                <div className="h-6 w-px bg-gray-300" />
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-orange-600 font-medium">
                                        Unsaved changes
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    /* View Mode - Show Edit Button */
                    <Button
                        onClick={onStartEdit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
                {/* Secondary Actions - Only show when not editing */}
                {!isEditing && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onShare}
                            className="p-2 hover:bg-gray-100"
                            title="Share Dashboard">
                            <Share2 className="w-4 h-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onExport}
                            className="p-2 hover:bg-gray-100"
                            title="Export Dashboard">
                            <Download className="w-4 h-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onSettings}
                            className="p-2 hover:bg-gray-100"
                            title="Dashboard Settings">
                            <Settings className="w-4 h-4" />
                        </Button>

                        <div className="h-6 w-px bg-gray-300" />
                    </>
                )}

                {/* Edit/Save Controls */}
                {isEditing && (
                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={onCancel}
                            variant="outline"
                            className="px-3 py-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button
                            onClick={onSave}
                            className={cn(
                                "px-4 py-2 font-medium",
                                hasUnsavedChanges
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed",
                            )}
                            disabled={!hasUnsavedChanges}>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                    </div>
                )}

                {/* More Actions Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hover:bg-gray-100">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-48">
                        {!isEditing && (
                            <>
                                <DropdownMenuItem onClick={onShare}>
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onExport}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Export Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}

                        <DropdownMenuItem onClick={onSettings}>
                            <Settings className="w-4 h-4 mr-2" />
                            Dashboard Settings
                        </DropdownMenuItem>

                        {isEditing && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={onCancel}
                                    className="text-red-600 focus:text-red-600">
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel Changes
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
