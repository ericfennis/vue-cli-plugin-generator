import StructureGeneratorTask from './components/StructureGeneratorTask'
import StructureGeneratorView from './components/StructureGeneratorView'

ClientAddonApi.component('org.vue.structure.generator', StructureGeneratorTask)

ClientAddonApi.addRoutes('org.vue.structure.generator', [
  { path: '/generator', name: 'org.vue.structure.generator.routes.test', component: StructureGeneratorView }
])