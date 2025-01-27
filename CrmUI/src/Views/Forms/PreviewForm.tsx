import { useAppSelector } from "../../store/hooks";
import LandInput from "./LandInput";



const PreviewForm: React.FC = () => {

  const form = useAppSelector(state => state.forms);



  return (
    <>
      <aside

        className={`fixed top-17 right-0 z-40 w-84  h-screen transition-transform`}
        aria-label="Sidebar"
      >

        <div className="h-full px-3 py-4 overflow-y-scroll bg-gray-200 dark:bg-gray-800">
          <ul className="space-y-2 font-medium mb-30">

            <li className=" border-b border-white  " >
              <span

                className={` items-center text-center block p-2 text-white bg-blue-500 rounded   group`}
              >
                <h3 className="ms-3 text-2xl">{(form.forms?.form_name)} Form Preview</h3>
              </span>
            </li>

            {(form.forms?.form_data?.length ?? 0) <= 0 ?

              <li className="border-dashed border dark:border-white rounded m-4" >
                <span

                  className={` items-center text-center block p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500  hover:text-white group`}
                >
                  <span className="ms-3">No Form Preview available.</span>
                </span>
              </li> : form.forms?.form_data?.map((element, index) => (
                <li key={index} className=" rounded m-4 border-b" >
                  
                  <LandInput formData={element} key={element.stage_id} />

                </li>
              ))
            }




          </ul>
        </div>
      </aside>
    </>
  );
}

export default PreviewForm;