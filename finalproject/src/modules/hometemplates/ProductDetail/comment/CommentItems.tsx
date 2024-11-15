import { Rate } from "antd";
import dayjs from "dayjs";
import { iconUser } from "../../../../types/type";


export type ListComment = {
    avatar: string;
    id: number;
    createDay: string;
    description: string;
    evaluate: number;
    nameUser: string;
  };
export const renderCommentItems = (listProduct:ListComment[])=>{
    return listProduct.map((items: ListComment) => {
        return (
          <div className="mt-5" key={items.id}>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {items.avatar ? (
                  <img src={items.avatar} className="logo-avatar" alt="avatar" />
                ) : (
                  <div className="logo-avatar">
                    {iconUser()}
                  </div>
                )}
                <div className="flex flex-col items-center">
                <span className="font-[500] text-lg">{items.nameUser}</span>
                
                <span>{dayjs(items.createDay).format("DD-MM-YYYY")}</span>
                </div>
                
              </div>
              <div>
                  <span className="font-[500] text-lg">Evaluate: </span>
                  <Rate value={items.evaluate} disabled />
                </div>
            </div>
            <p className="p-[10px] bg-white my-3 rounded-[5px]">
              {items.description}
            </p>
          </div>
        );
      });
}
