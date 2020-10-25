<Title>{greetings}</Title>

<script lang="ts">
  import Title from './Title.svelte'
  import { sayHello } from '../lib/utils'

  export let name: string
  $: greetings = sayHello(name)
</script>
