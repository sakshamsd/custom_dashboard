import { Routes } from "react-router-dom";
import rootRoute from "./routes/rootRoute";
import { renderRoutes } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <>
            <Provider store={store}>
                <Routes>{rootRoute.map((route) => renderRoutes(route))}</Routes>
            </Provider>
        </>
    );
}

export default App;
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "./components/Card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/Select";
// import { Button } from "./components/Button";
// import { Label } from "./components/Label";
// import { Input } from "./components/Input";
// import NumberCard from "./DashboardItems/NumberCard/NumberCard";
// import Dashboard from "./pages/Dashboard/Dashboard";

// function App() {
//     return (
//         <div className="App">
//             {/*    <Card className="w-[350px]">
//                 <CardHeader>
//                     <CardTitle>Create project</CardTitle>
//                     <CardDescription>Deploy your new project in one-click.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="name">Name</Label>
//                                 <Input
//                                     id="name"
//                                     placeholder="Name of your project"
//                                 />
//                             </div>
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="framework">Framework</Label>
//                                 <Select>
//                                     <SelectTrigger id="framework">
//                                         <SelectValue placeholder="Select" />
//                                     </SelectTrigger>
//                                     <SelectContent position="popper">
//                                         <SelectItem value="next">Next.js</SelectItem>
//                                         <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                                         <SelectItem value="astro">Astro</SelectItem>
//                                         <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                     <Button variant="outline">Cancel</Button>
//                     <Button>Deploy</Button>
//                 </CardFooter>
//             </Card>
//             <NumberCard
//                 value="714k"
//                 detail="Weekly sales"
//                 color="green"
//                 icon="AppWindowMac"
//             /> */}
//             <Dashboard />
//         </div>
//     );
// }

// export default App;
