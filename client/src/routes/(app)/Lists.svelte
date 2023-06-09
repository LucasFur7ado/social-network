<script>
import { getContacts } from "./actions.js"
import contactsStore from '$lib/store/contacts.js'

let open = false,
  contacts = [{ id: 0, name: "Para todos" }],
  selected = contacts[0]
</script>

<input type="hidden" value={selected.id} name="who" /> 
<div>
  <div on:keyup="{null}" on:click="{() => {
      open = !open
      if(open && $contactsStore.contacts) {
        contacts = $contactsStore.contacts
        return 
      }
      if (open)
        getContacts().then((r) => {
          contacts = r.data.map((c) => ({
              id: c.id, name: c.name,
            }))
          contacts = [{ id: 0, name: 'Para todos' }, ...contacts]
        })
    }}"
    class="rounded-full px-6 py-1 font-[mainFont] hover:bg-[var(--secondary)] duration-300
        border-[1px] cursor-pointer text-[15px] border-[var(--secondary)]">
    <span>{selected.name}</span>
  </div>
  {#if open}
    <div class="translate-x-[-50px] m-2 z-[2] absolute w-40 h-fit bg-[var(--secondary)] rounded-lg">
      {#if contacts == null}
        Loading contacts...
      {:else}
        {#each contacts as contact}
          <li on:click={() => {
            selected = contact
            open = !open 
          }} on:keyup={null} class="hover:bg-[var(--third)] cursor-pointer 
          duration-300 list-none border-b-[1px] 
          border-[var(--third)] rounded-lg p-2 flex items-center justify-between">
            <span>{contact.name}</span>
            {#if selected.id == contact.id} 
              <i class="bx bx-check" />
            {/if}
          </li>
        {/each}
      {/if}
    </div>
  {/if}
</div>
