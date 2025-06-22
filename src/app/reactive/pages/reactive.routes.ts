import { Routes } from "@angular/router";
import { CountryPageComponent } from "./pages/country-page/country-page.component";
import { BasicPageComponent } from "./basic-page/basic-page.component";
import { DynamicPageComponent } from "./dynamic-page/dynamic-page.component";
import { SwitchesPageComponent } from "./switches-page/switches-page.component";


export const reactiveRoutes: Routes =[

    {
        path:'',
        children:[
            {
                path:'basic',
                title: 'Básicos',
                component:BasicPageComponent,
            },
            {
                path:'dynamic',
                title: 'Dinámicos',
                component:DynamicPageComponent,
            },
            {
                path:'switches',
                title: 'Switches',
                component:SwitchesPageComponent,
            },
            {
                path:'**',
                redirectTo:'basic'
            }
        ]
    },
];