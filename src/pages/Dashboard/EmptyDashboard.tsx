import React from "react";
import { Edit3, Grid3x3, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "../../components/Button";
interface EmptyDashboardProps {
    handleStartEdit: () => void;
}
function EmptyDashboard({ handleStartEdit }: EmptyDashboardProps) {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <BarChart3 className="w-12 h-12 text-blue-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Dashboard</h2>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    Start building your analytics dashboard by entering edit mode. Add charts,
                    metrics, and widgets to visualize your data.
                </p>

                <Button
                    onClick={handleStartEdit}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium">
                    <Edit3 className="w-6 h-6 mr-3" />
                    Start Editing
                </Button>

                <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">Charts</p>
                        <p className="text-xs text-gray-500">Line, Bar, Pie</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Grid3x3 className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">Metrics</p>
                        <p className="text-xs text-gray-500">KPIs, Numbers</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Edit3 className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">Controls</p>
                        <p className="text-xs text-gray-500">Buttons, Tables</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyDashboard;
