// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2023 www.ebenmonney.com/mit-license
// ---------------------------------------

import { NgModule, ErrorHandler, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { NgbModalModule, NgbTooltipModule, NgbPopoverModule, NgbDropdownModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastaModule } from 'ngx-toasta';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { ThemeManager } from './services/theme-manager';
import { LocalStoreManager } from './services/local-store-manager.service';
import { OidcHelperService } from './services/oidc-helper.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';

import { EqualValidator } from './directives/equal-validator.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { BootstrapTabDirective } from './directives/bootstrap-tab.directive';
import { GroupByPipe } from './pipes/group-by.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { BannerDemoComponent } from './components/controls/banner-demo.component';
import { TodoDemoComponent } from './components/controls/todo-demo.component';
import { StatisticsDemoComponent } from './components/controls/statistics-demo.component';
import { NotificationsViewerComponent } from './components/controls/notifications-viewer.component';
import { SearchBoxComponent } from './components/controls/search-box.component';
import { UserInfoComponent } from './components/controls/user-info.component';
import { UserPreferencesComponent } from './components/controls/user-preferences.component';
import { UsersManagementComponent } from './components/controls/users-management.component';
import { RolesManagementComponent } from './components/controls/roles-management.component';
import { RoleEditorComponent } from './components/controls/role-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DBConfig } from 'ngx-indexed-db';
import { DiffLocDirective } from './directives/cs/diff-loc.directive';

// ==============================================
// Indexed DB
// const dbConfig: DBConfig = {
//   name: 'MyDb',
//   version: 1,
//   objectStoresMeta: [{
//     store: 'store_name',
//     storeConfig: { keyPath: 'id', autoIncrement: true },
//     storeSchema: [
//       { name: 'field_1', keypath: 'field_1', options: { unique: false }},
//     ]
//   }, {
//     store: 'store_name_2',
//     storeConfig: { keyPath: 'id', autoIncrement: true },
//     storeSchema: [
//       { name: 'field_2', keypath: 'field_2', options: { unique: false }},
//     ]
//   }],
//   migrationFactory
// };

// export function migrationFactory() {
//   return {
//     // Key is version no, then we do migration on RHS. 
//     2: (db, transaction) => {
//       const store = transaction.objectStore('store_name');
//       store.createIndex('field_3', 'field_3', { unique: false })
//     },
//   }
// }

// ==============================================


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent,
    ProductsComponent,
    OrdersComponent,
    SettingsComponent,
    UsersManagementComponent, UserInfoComponent, UserPreferencesComponent,
    RolesManagementComponent, RoleEditorComponent,
    AboutComponent,
    NotFoundComponent,
    NotificationsViewerComponent,
    SearchBoxComponent,
    StatisticsDemoComponent, TodoDemoComponent, BannerDemoComponent,
    EqualValidator,
    AutofocusDirective,
    BootstrapTabDirective,
    GroupByPipe,
    DiffLocDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    NgbTooltipModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbCarouselModule,
    NgbModalModule,
    NgxDatatableModule,
    ToastaModule.forRoot(),
    NgSelectModule,
    NgChartsModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 5 seconds (whichever comes first).
      // Default is 30 seconds.
      registrationStrategy: 'registerWhenStable:5000'
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AlertService,
    ThemeManager,
    ConfigurationService,
    AppTranslationService,
    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
    OidcHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
